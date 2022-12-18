import React, { ReactNode, useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  SearchBoxProps,
  Hits,
  HitsProps,
  useInstantSearch,
  Pagination,
} from "react-instantsearch-hooks-web";
import { Post } from "../types/post";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { debounce } from "debounce";
import { format } from "date-fns";
import { db } from "../firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../types/user";
import useSWR from "swr/immutable";

const searchClient = algoliasearch(
  "H6VRU32IGG",
  "94491a1411a8551a6fee0ac8fb50ad7d"
);

const Hit: HitsProps<Post>["hitComponent"] = ({ hit }) => {
  const { data: user } = useSWR<User>(
    hit.authorId && `users/${hit.authorId}`,
    async () => {
      const ref = doc(db, `users/${hit.authorId}`);
      const snap = await getDoc(ref);
      return snap.data() as User;
    }
  );

  return (
    <div className="rounded-md shadow p-4">
      <h2 className="line-clamp-2">{hit.title}</h2>
      <p className="text-slate-500">
        {format(hit.createdAt, "yyyy年MM月dd日")}
      </p>
      {user && <p className="truncate">{user.name}</p>}
    </div>
  );
};

const NoResultsBoundary = ({ children }: { children: ReactNode }) => {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return <p>「{results.query}」検索結果はありませんでした。</p>;
  }

  return (
    <div>
      {results.query && (
        <p className="text-sm text-slate-500 my-4">
          「{results.query}」の検索結果が{results.nbHits}件見つかりました。
        </p>
      )}
      {children}
    </div>
  );
};

const Search = () => {
  const search: SearchBoxProps["queryHook"] = (query, hook) => {
    hook(query);
  };

  return (
    <div className="container">
      <h1>検索</h1>

      <InstantSearch indexName="posts" searchClient={searchClient}>
        <SearchBox
          classNames={{
            root: "relative inline-block",
            input: "rounded-full border-slate-300 pr-10",
            submitIcon: "hidden",
            resetIcon: "hidden",
          }}
          submitIconComponent={() => (
            <span className="absolute right-0 p-2 w-10 top-1/2 -translate-y-1/2">
              <MagnifyingGlassIcon className="w-5 h-5 text-slate-500" />
            </span>
          )}
          queryHook={debounce(search, 2000)}
        />
        <NoResultsBoundary>
          <Hits<Post>
            classNames={{
              list: "space-y-4 my-6",
            }}
            hitComponent={Hit}
          />
          <Pagination
            classNames={{
              list: "flex space-x-1",
              link: "py-1 px-3",
              disabledItem: "opacity-40",
              selectedItem: "text-blue-500",
            }}
          />
        </NoResultsBoundary>
      </InstantSearch>
    </div>
  );
};

export default Search;
