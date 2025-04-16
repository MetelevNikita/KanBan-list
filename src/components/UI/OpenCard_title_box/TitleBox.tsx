import { FC } from 'react'

// css

import styles from '@/components/UI/OpenCard_title_box/TitleBox.module.css'

//

interface TitleBoxProps {
  title: string
  description: string | undefined
}

const TitleBox: FC<TitleBoxProps> = ({title, description}) => {
  return (
    <div className={styles.title_box_container}>
        <div className={styles.title_box_title}>{title}</div>
        <div className={styles.title_box_text}>{description}</div>
    </div>
  )
}

export default TitleBox
