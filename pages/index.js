/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export async function getServerSideProps() {
  const res = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  return {
    props: {
      pokemon: await res.json(),
    },
  };
}

export default function Home({ pokemon }) {
  const imgURL = "https://jherr-pokemon.s3.us-west-1.amazonaws.com/";
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className={styles.grid}>
        {pokemon.map((p) => (
          <div key={p.id} className={styles.card}>
            <Link href={`/pokemon/${p.id}`}>
              <a>
                <img src={`${imgURL}${p.image}`} alt="pokemon image" />
                <h3>{p.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
