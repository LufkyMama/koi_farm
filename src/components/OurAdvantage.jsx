import React from 'react'
import fish1 from '../assets/fish1.jpg'
import { CheckCircle2 } from 'lucide-react'
import { checkListItem } from '../constants'

function OurAdvantage() {
  return (
    <div>
      <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl text-center my-10 tracking-wide ">
        Why People Choosing Us
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="p-2 w-full lg:w-1/2">
          <img src={fish1} alt="fish" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checkListItem.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-black mx-6 bg bg-white h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurAdvantage