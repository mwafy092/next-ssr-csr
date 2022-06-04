/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

const Details = () => {
  const [pokemon, setPokemon] = useState(null);
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      setPokemon(await res.json());
    };
    if (id) {
      getPokemon();
    }
  }, [id]);
  const imgURL = "https://jherr-pokemon.s3.us-west-1.amazonaws.com/";
  if (!pokemon) {
    return null;
  }
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`${imgURL}${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
