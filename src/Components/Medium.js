import React, { useState, useEffect } from "react";
import _map from "lodash/map";

// https://itnext.io/react-hooks-tutorial-on-developing-a-custom-hook-for-data-fetching-8ad5840db7ae
const useFetch = url => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        console.log("useFetch response", response);
        if (response.ok) {
          const data = await response.json();
          console.log("useFetch data json :: ", data);
          setData(data);
        } else {
          setError(new Error(response.statusText));
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    })();
  }, [url]);
  return { error, loading, data };
};

function Article({ item }) {
  // console.log("Article item", item);
  return (
    <div className="row education">
      <div className="three columns header-col">
        <h1>
          <span>
            <a href={item.link} target="_blank">
              {" "}
              {item.title}{" "}
            </a>
          </span>
        </h1>
      </div>
      <div className="nine columns main-col">
        <div className="row item">
          <div className="two columns">
            {new Intl.DateTimeFormat("default", {
              year: "numeric",
              month: "long",
              day: "numeric"
            }).format(new Date(item.pubDate))}
          </div>
          <div className="ten columns">
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// functios
function Loading() {
  console.log("medium loading :: ");
  return <div> Loading...</div>;
}

function Medium({ mediumRssToJsonUrl }) {
  console.log("Medium mediumRssToJsonUrl", mediumRssToJsonUrl);
  const { loading, data } = useFetch(mediumRssToJsonUrl);
  // const { error, loading, data } = useFetch(mediumRssToJsonUrl);
  // if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  return (
    <section id="articles">
      {data &&
        data.items &&
        _map(data.items, (item, i) => <Article key={i} item={item} />)}
    </section>
  );
}

export default Medium;
