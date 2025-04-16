import { FC, useState } from "react"
import Image from "next/image"


// css

import styles from '@/components/OpenCard/OpenCard.module.css'

// types

import{ CardType } from "@/types/type"

// img

import backIcon from '@/asset/opencard/back_img.svg'
import agreetIcon from '@/asset/card/agreet.svg'
import rejectedIcon from '@/asset/card/rejected.svg'
import commentIcon from '@/asset/card/comments.svg'
import deleteIcon from '@/asset/card/delete.svg'
import dateIcon from '@/asset/card/deadline.svg'

// img check

import urgentlyIcon from '@/asset/opencard/prioryty/gorit.svg'
import waithIcon from '@/asset/opencard/prioryty/waith.svg'
import standartIcon from '@/asset/opencard/prioryty/standart.svg'

// components

import TitleBox from '@/components/UI/OpenCard_title_box/TitleBox'


interface OpenCardProps {
  card: CardType
  id: any
}

const OpenCard: FC<OpenCardProps> = ({ card, id }) => {

  const {activeId, setActiveId} = id


  console.log(card)

  return (
    <div className={styles.openCard_container}>


      <div className={styles.openCard_header}>

          <div className={styles.openCard_header_back_container} onClick={() => {setActiveId(null)}}>
              <Image className={styles.openCard_header_back_image} src={backIcon} alt="back"/>
              <div className={styles.openCard_header_back_title}>Назад</div>
          </div>


          <div className={styles.openCard_header_title_container}>

            <div className={styles.openCard_header_title_menu}>Описание проекта</div>
            <div className={styles.openCard_header_title_menu}>Подробности</div>

          </div>

      </div>


      <div className={styles.openCard_main}>


          <div className={styles.openCard_title}>{card.title}</div>

          <hr className={styles.openCard_line}/>

            <div className={styles.openCard_info_container}>

                <div className={styles.openCard_status_container}>

                  <Image className={styles.openCard_status_image} src={agreetIcon} alt="agreed"/>
                  <div className={styles.openCard_status_title}>Согласовано</div>

                </div>


                  <div className={styles.openCard_date_box}>

                    <Image src={dateIcon} alt="date" className={styles.openCard_date_image} />
                    <div className={styles.openCard_date_title}>{card.deadline}</div>

                  </div>


                  <div className={styles.openCard_delete_box}>

                    <Image src={deleteIcon} alt="date" className={styles.openCard_delete_image} />

                  </div>

            </div>

          <hr className={styles.openCard_line}/>


            <TitleBox title='Описание проекта' description={card.description} />
            <TitleBox title='Автор' description={card.name} />
            <TitleBox title='Телефон' description={card.phone} />
            <TitleBox title='Тип Продукта' description={card.typeproduct} />
            <TitleBox title='Тип Продукта' description={card.typeproduct} />

            <TitleBox title='Формат продукта' description={card.promotion} />
            <TitleBox title='Зрители' description={card.viewer} />
            <TitleBox title='Какой эффект хотите получить' description={card.effect} />

            <hr className={styles.openCard_line}/>

            <div className={styles.openCard_title}>Техническася спецификация</div>

            <TitleBox title='Закадровый текст' description={card.voiceover} />
            <TitleBox title='Хронометраж' description={card.timing} />
            <TitleBox title='Площадка для размещения' description={card.place} />


            <div className={styles.prioryty_container}>

              <div className={styles.prioryty_title}>Приоритет</div>

                <div className={styles.prioryty_box}>
                    <Image className={styles.prioryty_icon} src={urgentlyIcon} alt="urgently"/>
                    {/* <div className={styles.prioryty_Icon_title}>{card.prioryty}</div> */}
                </div>

            </div>


      </div>
    </div>
  )
}

export default OpenCard
