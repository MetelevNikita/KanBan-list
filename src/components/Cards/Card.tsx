import { FC } from 'react'
import Image from 'next/image'

// img

import agreetIcon from '@/asset/card/agreet.svg'
import rejectedIcon from '@/asset/card/rejected.svg'
import timeIcon from '@/asset/card/deadline.svg'
import deleteIcon from '@/asset/card/delete.svg'

// css

import styles from '@/components/Cards/Card.module.css'

interface CardProps {

}

const Card: FC = () => {
  return (

    <div className={styles.card_container}>

        <div className={styles.card_box}>

          <div>

              <div className={styles.card_theme_box}>
                <div className={styles.card_title}>TITLE</div>
                <div className={styles.card_date_create}>DEADLINE</div>
              </div>


              <div className={styles.card_description}>description</div>

          </div>


          <hr className={styles.card_line}/>

              <div className={styles.card_info_container}>

                  <div className={styles.card_info_box}>

                    <Image src={agreetIcon} alt="Agreet Icon" />
                    <div className={styles.card_info_text}>Согласовано</div>

                  </div>

                  <div className={styles.card_info_box}>

                    <Image src={timeIcon} alt="Agreet Icon" />
                    <div className={styles.card_info_text}>02.02.2025</div>

                  </div>

                  <div className={styles.card_info_box}>

                    <Image src={deleteIcon} alt="Agreet Icon" />

                  </div>



              </div>

        </div>

    </div>
  )
}

export default Card