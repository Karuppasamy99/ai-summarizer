import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState('');
  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));
    if (articlesFromLocalStorage){
     setAllArticles(articlesFromLocalStorage);
    }
  },[])

//   const handleCopy = (copyUrl) => {
//     setCopied(copyUrl);
//     navigator.clipboard.writeText(copyUrl);
//     setTimeout(() => setCopied(false), 3000);
//   };

//   const handleKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       handleSubmit(e);
//     }
//   };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {data} = await getSummary({articleUrl: article.url})
    if(data?.summary){
        const newArticle = {...article, summary:data.summary}
        const updatedArticle = [newArticle, ...allArticles]
        setArticle(newArticle)
        setAllArticles(updatedArticle)
        localStorage.setItem("articles", JSON.stringify(updatedArticle))
    }
    
  }

  return (
    <section className="w-full mt-10 max-w-xl">
      <div className="w-full flex flex-col">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="copy_icon"
            className="absolute left-0 my-3 ml-3 w-5"
          />
          <input
            className="url_input peer"
            placeholder="Enter the URL"
            required
            value={article.url}
            onChange={(e) => { setArticle({...article, url: e.target.value})}}
            // onKeyDown={handleKeyDown}
            type="url"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        <div className="flex flex-col gap-2 overflow-y-auto my-3">
            {allArticles.map((item, index)=>(
                <div key={`link-${index}`} onClick={()=>setArticle(item)} className="link_card">
                    <div className="copy_btn">
                        <img src={copied === item.url? tick : copy} alt="copy_icon" className="w-[50%] h-[50%] object-contain"/>
                    </div>
                    <p className="flex-1 font-satoshi truncate text-blue-700 font-medium text-sm">{item.url}</p>
                </div>    
            ))}
           
        </div>
        <div className="my-10 flex max-w-full justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="loader_image" className="w-20 h-20 object-contain"/>
                ): error ? (
                    <p>Its not going to happen....<br />
                    <span>{error?.data?.error}</span></p>
                ):
                article.summary && (
                    <div className="flex flex-col gap-3">
                        <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                            Summary <span className="blue_gradient">Article</span>
                        </h2>
                        <div className="summary_box">
                            <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                        </div>
                    </div>
                ) }
        </div>
      </div>
    </section>
  );
};

export default Demo;
