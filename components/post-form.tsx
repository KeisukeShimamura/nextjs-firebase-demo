import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Post } from "../types/post";
import classNames from "classnames";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { revalidate } from "../lib/revalidate";

const PostForm = ({ isEditMode }: { isEditMode: boolean }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Post>();

  const { fbUser, isLoading } = useAuth();
  const router = useRouter();
  const editTargetId = router.query.id as string;

  useEffect(() => {
    if (editTargetId) {
      const ref = doc(db, `posts/${editTargetId}`);
      getDoc(ref).then((snap) => {
        const oldPost = snap.data() as Post;
        reset(oldPost);
      });
    }
  }, [editTargetId]);

  if (!fbUser) {
    if (!isLoading) {
      router.push("/login");
    }
    return null;
  }

  const submit = (data: Post) => {
    const ref = isEditMode
      ? doc(db, `posts/${editTargetId}`)
      : doc(collection(db, "posts"));
    const post: Post = {
      id: isEditMode ? editTargetId : ref.id,
      title: data.title,
      body: data.body,
      createdAt: editTargetId ? data.createdAt : Date.now(),
      updatedAt: editTargetId ? Date.now() : null,
      authorId: fbUser.uid,
    };

    setDoc(ref, post).then(async () => {
      await revalidate("/");

      return revalidate(`/posts/${post.id}`)
        .then((res) => res.json())
        .then(() => {
          alert(`記事を${isEditMode ? "更新" : "作成"}しました`);
        })
        .catch((e) => {
          console.log(e);
          alert("ページ再生成が失敗しました");
        });
    });
  };

  const deletePost = async () => {
    const ref = doc(db, `post/${editTargetId}`);
    return deleteDoc(ref).then(async () => {
      alert("記事を削除しました");

      await revalidate("/");
      await revalidate(`/posts/${editTargetId}`);

      router.push("/");
    });
  };

  return (
    <div>
      <h1>記事{isEditMode ? "編集" : "投稿"}</h1>

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
                value: 100,
                message: "最大100文字です",
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
                value: 400,
                message: "最大400文字です",
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

        <Button>{isEditMode ? "更新" : "投稿"}</Button>
        {isEditMode && (
          <button type="button" onClick={deletePost}>
            削除
          </button>
        )}
      </form>
    </div>
  );
};

export default PostForm;
