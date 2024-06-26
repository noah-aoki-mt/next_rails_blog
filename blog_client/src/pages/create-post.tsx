import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from "axios";
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/api/v1/posts", {
                title: title,
                content: content,
            }
            )

            router.push("/");
        } catch (err) {
            alert("投稿に失敗しました")
        }
    }

    return (
        <div className={styles.contaier}>
            <h1 className={styles.title}>ブログ新規登録</h1>
            <form className={styles.form}
            onSubmit={handleSubmit}>
                <label className={styles.label}>タイトル</label>
                <input type="text" className={styles.input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                    } />

                <label className={styles.label}>本文</label>
                <textarea className={styles.textarea}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
                } />
                <button type="submit">投稿</button>
            </form>
        </div>
    )
}

export default CreatePost;