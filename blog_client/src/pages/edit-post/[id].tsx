import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from "axios";
import { useRouter } from 'next/router';
import { Post } from '../../types';
import styles from "@/styles/Home.module.css";

type Props = {
    post: Post;
}
export async function getServerSideProps(context: any) {
    const id = context.params.id;

    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
    const post = await res.json();

    console.log(id);
    return {
        props: {
            post,
        },
    }

}

const EditPost = ({ post }: Props) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (title.trim() === '' || content.trim() === '') {
                alert("タイトルと本文のどちらも入力してください");
                return;
            }
            await axios.put(`http://localhost:3001/api/v1/posts/${post.id}`, {
                title: title,
                content: content,
            }
            )
            router.push("/");
        } catch (err) {
            console.log(err);
            alert("編集に失敗しました")
        }
    }

    return (
        <div className={styles.contaier}>
            <h1 className={styles.title}>ブログの編集</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>タイトル</label>
                <input type="text" className={styles.input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                    } 
                    value={title}
                    />
                <label className={styles.label}>本文</label>
                <textarea className={styles.textarea}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setContent(e.target.value)
                    } 
                    value={content}
                    />
                <button type="submit">変更</button>
            </form>
        </div>
    )
}

export default EditPost;