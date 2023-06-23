import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {FormFields, Loader} from "../components/index.js";
import {preview} from "../assets"
import {getRandomPrompt} from "../utils/index.js";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setFrom] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/dalle',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({prompt: form.prompt}),
        })

        const data =await response.json();

        setFrom({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      }catch (error){
        alert(error)
      }finally {
        setGeneratingImg(false)
      }
    }else {
      alert('Please enter a prompt')
    }
  }

  const handleSubmit = async (values) => {
    values.preventDefault()
    if (form.prompt && form.photo) {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:8080/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })
        await  response.json()
        navigate('/')
        setLoading(false)
      } catch (error) {
        alert(error)
        setLoading(false)
      }
    }else {
      alert("Please enter a prompt and generate image")
    }
  }

  const handleChange = (e) => {
    setFrom({...form, [e.target.name]: e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setFrom({...form, prompt: randomPrompt})
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create though a collection of imaginative and visually stunning images by AI and share with friends
        </p>
      </div>

      <form className="mt-16 mx-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormFields
            labelName="Your full name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormFields
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div
            className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center item-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
            ) : (
              <img src={preview} alt="perview" className="w-9/12 h-9/12 object-contain opacity-40"/>
            )}
          </div>

          {generatingImg && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rbga(0,0,0,0.5)] rounded-lg">
              <Loader/>
            </div>
          )}
        </div>

        <div>
          <button type="button" onClick={generateImage}
                  className="mt-3 text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image yu want, you can share it with others
          </p>
          <button type="submit"
                  className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {loading ? 'Sharing...' : 'Share with others'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost