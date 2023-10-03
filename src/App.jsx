import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

import { AiFillPicture } from 'react-icons/ai';
import { ImFilePicture } from 'react-icons/im';
import './App.css';

function App() {
  // I) Hooks and Variables
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    'Painting of 2 dogs playing poker, in the style of Vermeer.'
  );
  const [prompt, setPrompt] = useState(placeholder);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // II) Handlers and Functions
  const generateImage = async () => {
    try {
      setLoading(true);
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
      });
      setLoading(false);
      setResult(res.data.data[0].url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChangePrompt = (e) => {
    console.log(e.target.value)
    setPrompt(e.target.value)
  }

  // III) JSX
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="d-flex flex-column  bg-dark">
        <h2 className="mb-4">OpenAI Image Generator</h2>
        <textarea
          className="mb-3 mx-2 px-2"
          placeholder={placeholder}
          onChange={handleOnChangePrompt}
          value = {prompt}
          rows="5"
          cols="30"
        />
        <button
          className="btn btn-success w-50 mx-auto"
          onClick={generateImage}
        >
          Generate!
        </button>
        {loading ? (
          <>
            
              <h3 className="mt-4">
                Generating..Please Wait...{' '}
                <div class="spinner-border text-white" role="status"></div>
              </h3>
           
          </>
        ) : (
          <div className="mt-4 text-center">
            {result ? (
              <img
                src={result}
                alt="result"
                width="300"
                class="img-thumbnail"
              ></img>
            ) : (
              <AiFillPicture className="picture-default border b-light b-2" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
