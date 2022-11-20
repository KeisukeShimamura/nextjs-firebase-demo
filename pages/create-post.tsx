import React from "react";
import { useForm } from "react-hook-form";
import { Post } from "../types/post";
import classNames from "classnames";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Post>();

  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  if (!fbUser) {
    if (!isLoading) {
      router.push("/login");
    }
    return null;
  }

  const submit = (data: Post) => {
    const ref = doc(collection(db, "posts"));
    const post: Post = {
      id: ref.id,
      title: data.title,
      body: data.body,
      createdAt: Date.now(),
      updatedAt: null,
      authorId: fbUser.uid,
    };

    setDoc(ref, post).then(() => {
      alert("記事を作成しました");
    });
  };

  return (
    <div>
      <h1>記事投稿</h1>

      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label className="block md-0.5" htmlFor="title">
            タイトル*
          </label>
          <input
            className={classNames(
              "rounded border",
              errors.title ? "border-red-500" : "border-slate-300"
            )}
            {...register("title", {
              required: "必須入力です",
              maxLength: {
                value: 50,
                message: "最大50文字です",
              },
            })}
            id="title"
            type="text"
          />
          {errors.title && (
            <p className="text-red-500 mt-0.5">{errors.title?.message}</p>
          )}
        </div>

        <div>
          <label className="block md-0.5" htmlFor="body">
            本文*
          </label>
          <textarea
            className={classNames(
              "rounded border",
              errors.body ? "border-red-500" : "border-slate-300"
            )}
            {...register("body", {
              required: "必須入力です",
              maxLength: {
                value: 255,
                message: "最大255文字です",
              },
            })}
            id="profile"
          />
          <p className="text-sm text-slate-400 leading-none">
            {watch("body")?.length || 0}/255
          </p>
          {errors.body && (
            <p className="text-red-500 mt-0.5">{errors.body?.message}</p>
          )}
        </div>

        <Button>投稿</Button>
      </form>
    </div>
  );
};

export default CreatePost;
