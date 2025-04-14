'use client'

import { FC, useState } from 'react'

// css

import styles from '@/components/UI/Select/MySelect.module.css'


//

interface MySelectProps {
  title: string
  arr: string[]
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  name: string
}

const MySelect: FC<MySelectProps> = ({title, arr, value, onChange, name}) => {


  const [active, isActive] = useState<boolean>(false)

  console.log(active)

  return (

    <div className={styles.select_container}>

      <span className={styles.select_title}>{title}</span>

      <select className={styles.select_box} name={name} value={value} onChange={onChange} onFocus={() => isActive(!active)}>
        {arr.map((item: any, index: number) => {
          return <option key={index+1} className={styles.select_option} value={item}>{item}</option>
        })}
      </select>

      <hr className={(active) ? styles.select_line_acitive : styles.select_line}/>


    </div>

  )
}

export default MySelect
