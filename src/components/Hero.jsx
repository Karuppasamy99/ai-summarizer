import { logo } from '../assets'

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col pt-3 mb-10">
        <nav className="w-full flex justify-between">
            <img  src={logo} className="w-28 object-contain" />
            <button className="black_btn" onClick={() => window.open("https://github.com/karuppasamy99")}>Github</button>
        </nav>
        <h1 className="head_text">
            Summarize Article with <br className='max-md:hidden'/>
            <span className="orange_gradient">OpenAI ChatGPT4</span>
        </h1>
        <h2 className="desc">
            Summarize the article to save you valuable time
        </h2>
    </header>
  )
}

export default Hero