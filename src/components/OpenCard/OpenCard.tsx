import { FC, useState, useEffect } from "react"
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
import userIcon from '@/asset/card/user.svg'
import deleteIcon from '@/asset/card/delete.svg'
import dateIcon from '@/asset/card/deadline.svg'

// img check

import urgentlyIcon from '@/asset/opencard/prioryty/gorit.svg'
import waithIcon from '@/asset/opencard/prioryty/waith.svg'
import standartIcon from '@/asset/opencard/prioryty/standart.svg'

// components

import TitleBox from '@/components/UI/OpenCard_title_box/TitleBox'
import MyButton from "../UI/Button/MyButton"
import Comment from '@/components/UI/Comment/Comment'

// functions




interface OpenCardProps {
  card: CardType
  id: any
  deleteHandler: any
}

const OpenCard: FC<OpenCardProps> = ({ card, id, deleteHandler }) => {


  const {activeId, setActiveId} = id
  const [currentCard, setCurrentCard] = useState<CardType | null>(null)
  const [menu, setMenu] = useState<string>('description')





  const deleteCard = (id: number | string) => {

    setActiveId(null)
    deleteHandler(id)
  }

  const createComment = async (formData: FormData): Promise<any> => {
    try {

      const text = formData.get('comment') as string

      const response = await fetch(`/api/comments/${currentCard?.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(text)
      })

      const data = await response.json()
      formData.set('comment','')
      return data

    } catch (error) {
      console.log('ОШИБКА' + error)
    }
  }


  console.log(card)




  return (
    <div className={styles.openCard_container}>

      <div className={styles.openCard_header}>

          <div className={styles.openCard_header_back_container} onClick={() => {setActiveId(null)}}>
              <Image className={styles.openCard_header_back_image} src={backIcon} alt="back"/>
              <div className={styles.openCard_header_back_title}>Назад</div>
          </div>


          <div className={styles.openCard_header_title_container}>

            <div className={styles.openCard_header_title_menu} onClick={() => {setMenu('description')}}>Описание проекта</div>
            <div className={styles.openCard_header_title_menu} onClick={() => {setMenu('comment')}}>Подробности</div>

          </div>

      </div>


      {(menu === 'description') && <div className={styles.openCard_main}>

          <div className={styles.openCard_title}>{card.title}</div>

          <hr className={styles.openCard_line}/>

            <div className={styles.openCard_info_container}>

                {card.status === 'inbox' && <div className={styles.openCard_status_container}></div>}

                {card.status === 'agreed' && <div className={styles.openCard_status_container}><Image className={styles.openCard_status_image} src={agreetIcon} alt="agreed"/><div className={styles.openCard_status_title}>Согласовано</div></div>}

                {card.status === 'rejected' && <div className={styles.openCard_status_container}><Image className={styles.openCard_status_image} src={rejectedIcon} alt="rejected"/><div className={styles.openCard_status_title}>Отклонено</div></div>}

                {card.status === 'Agreed with comments' && <div className={styles.openCard_status_container}><Image className={styles.openCard_status_image} src={commentIcon} alt="Соглосовано с замечаниями"/><div className={styles.openCard_status_title}>Отклонено</div></div>}


                {(card.status !== 'agreed' && card.status !== 'rejected' && card.status !== 'Agreed with comments') ? <div className={styles.openCard_status_container}><Image className={styles.openCard_status_image} src={userIcon} alt="Взята в работу"/><div className={styles.openCard_status_title}>Карточка в работу у {card.status}</div></div> : <></>}



                  <div className={styles.openCard_date_box}>
                    <Image src={dateIcon} alt="date" className={styles.openCard_date_image} />
                    <div className={styles.openCard_date_title}>{card.deadline}</div>
                  </div>


                  <div className={styles.openCard_delete_box}>
                    <Image src={deleteIcon} alt="date" className={styles.openCard_delete_image} onClick={() => deleteCard(card.id)}/>
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
                    <div className={styles.prioryty_Icon_title}>{card.prioryty}</div>
                </div>

            </div>


      </div>}



      {(menu === 'comment') && <form action={createComment}><div className={styles.openCard_comment}>



            <div className={styles.openCard_comment_textarea_container}>

              <div className={styles.openCard_comment_textarea_title}>Введите комментарий</div>
              <textarea className={styles.openCard_comment_textarea} defaultValue={''} name="comment"/>

            </div>


            <div className={styles.openCard_button_container}>
              <MyButton text={"создать"} type={"submit"} name={""} />
            </div>


            <div className={styles.openCard_comment_container}>

              {/* {currentCard?.comment.map((comment: string, index: number) => {
                return <Comment key={index+1} author={'TEST'} date={new Date().toLocaleDateString()} comment={comment} number={index+1} />
              })} */}


            </div>

        </div></form>}

    </div>
  )
}

export default OpenCard
