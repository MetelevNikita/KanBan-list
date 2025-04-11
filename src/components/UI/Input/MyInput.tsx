'use client'

import { FC, useState } from 'react'

// css

import styles from '@/components/UI/Input/MyInput.module.css'

//

interface MyInputProps {
  type: string
  name: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

const MyInput: FC<MyInputProps> = ({ type, name, placeholder, onChange, value }) => {

  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div className={styles.input_container}>

      <input className={styles.input_text} type={type} name={name} placeholder={placeholder} onFocus={() => {setIsActive(true)}} onChange={onChange} value={value}/>
      <hr className={(isActive) ? `${styles.input_hr_active}` : `${styles.input_hr}`}/>

    </div>
  )
}

export default MyInput
