import Link from "next/link";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import type { Post } from "../types";

type Props = {
  posts: Post[];
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default function Home({ posts }: Props) {
  const router = useRouter();

  const handleDelete = async (id: any) => {
    const confirmed = window.confirm('本当に削除しますか？');
    if (!confirmed) {
      return; // キャンセルされた場合は何もしない
    }
    try {
      await axios.delete(`http://localhost:3001/api/v1/posts/${id}`)

      router.reload();
    } catch (err) {
      console.error(err);
      alert("削除に失敗しました")
    }
  }

  return (
    <div className={styles.homeContainer}>
      <h2>Rails & Next.js Blog</h2>
      <Link href="/create-post" className={styles.createButton}>Create New Post</Link>
      <div>
        {posts.map((post: Post) => (
          <div key={post.id} className={styles.postCard}>
            <Link href={`posts/${post.id}`} className={styles.postCardBox}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
            <Link href={`/edit-post/${post.id}`}>
            <button className={styles.editButton}>
              Edit
            </button>
            </Link>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div> 
          ))}
      </div>
    </div>
  );
}