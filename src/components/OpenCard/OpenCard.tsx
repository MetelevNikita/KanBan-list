import { FC, useState, useEffect } from "react"
import Image from "next/image"


// css

import styles from '@/components/OpenCard/OpenCard.module.css'

// types

import{ CardType, UsersType, CommentCardTypes } from "@/types/type"

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
  user: {currentUser: string | undefined, setCurrentUser: any}
}

const OpenCard: FC<OpenCardProps> = ({ card, id, deleteHandler, user }) => {


  const {activeId, setActiveId} = id
  const { currentUser, setCurrentUser } = user

  //

  const [currentCard, setCurrentCard] = useState<CardType>()
  const [update, setUpdate] = useState<string | number>('')
  const [menu, setMenu] = useState<string>('description')

  //



  useEffect(() => {
    getSingleCard()
  }, [update])


  const getSingleCard = async () => {
    try {

      const responce = await fetch(`/api/cards/${card.id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })


      if(!responce.ok) {
        throw new Error('Что то пошло не так')
      }

      const data = await responce.json()
      setCurrentCard(data)
      return data

    } catch (error) {
      console.log(error)
    }
  }

  const deleteCard = (id: number | string) => {

    setActiveId(null)
    deleteHandler(id)
  }


  //

  const createComment = async (formData: FormData): Promise<any> => {
    try {

      const text = formData.get('comment') as string

      const response = await fetch(`/api/comments/${card.id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(text)
      })

      const data = await response.json()
      formData.set('comment','')
      setUpdate(Math.random())
      return data

    } catch (error) {
      console.log('ОШИБКА' + error)
    }
  }


  const deleteComment = async (id: number | string) => {
    try {

      const responce = await fetch(`/api/comments/${currentCard?.id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(id)
      })


      if(!responce.ok) {
        throw new Error('Что то пошло не так')
      }

      const data = await responce.json()
      setUpdate(Math.random())
      return data

    } catch (error) {
      console.log(error)
    }
  }



  if(!currentCard) {
    return <div>loading...</div>
  }



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

          <div className={styles.openCard_title}>{currentCard.title}</div>

          <hr className={styles.openCard_line}/>

            <div className={styles.openCard_info_container}>

                {currentCard.status === 'inbox' && <div className={styles.openCard_status_container}></div>}

                {currentCard.status === 'agreed' && <div className={styles.openCard_status_container}><Image className={styles.openCard_status_image} src={agreetIcon} alt="agreed"/><div className={styles.openCard_status_title}>Согласовано</div></div>}

                {currentCard.status === 'rejected' && <div className={styles.openCard_status_container}><Image className={styles.openCard_status_image} src={rejectedIcon} alt="rejected"/><div className={styles.openCard_status_title}>Отклонено</div></div>}

                {currentCard.status === 'Agreed with comments' && <div className={styles.openCard_status_container}><Image className={styles.openCard_status_image} src={commentIcon} alt="Соглосовано с замечаниями"/><div className={styles.openCard_status_title}>Отклонено</div></div>}


                {(currentCard.status !== 'agreed' && currentCard.status !== 'rejected' && currentCard.status !== 'Agreed with comments') ? <div className={styles.openCard_status_container}><Image className={styles.openCard_status_image} src={userIcon} alt="Взята в работу"/><div className={styles.openCard_status_title}>Карточка в работу у {currentCard.status}</div></div> : <></>}



                  <div className={styles.openCard_date_box}>
                    <Image src={dateIcon} alt="date" className={styles.openCard_date_image} />
                    <div className={styles.openCard_date_title}>{currentCard.deadline}</div>
                  </div>


                  <div className={styles.openCard_delete_box}>
                    <Image src={deleteIcon} alt="date" className={styles.openCard_delete_image} onClick={() => deleteCard(card.id)}/>
                  </div>

            </div>

          <hr className={styles.openCard_line}/>


            <TitleBox title='Описание проекта' description={currentCard.description} />
            <TitleBox title='Автор' description={currentCard.name} />
            <TitleBox title='Телефон' description={currentCard.phone} />
            <TitleBox title='Тип Продукта' description={currentCard.typeproduct} />
            <TitleBox title='Тип Продукта' description={currentCard.typeproduct} />

            <TitleBox title='Формат продукта' description={currentCard.promotion} />
            <TitleBox title='Зрители' description={currentCard.viewer} />
            <TitleBox title='Какой эффект хотите получить' description={currentCard.effect} />

            <hr className={styles.openCard_line}/>

            <div className={styles.openCard_title}>Техническася спецификация</div>

            <TitleBox title='Закадровый текст' description={currentCard.voiceover} />
            <TitleBox title='Хронометраж' description={currentCard.timing} />
            <TitleBox title='Площадка для размещения' description={currentCard.place} />

            <div className={styles.prioryty_container}>

              <div className={styles.prioryty_title}>Приоритет</div>

                <div className={styles.prioryty_box}>
                    <Image className={styles.prioryty_icon} src={urgentlyIcon} alt="urgently"/>
                    <div className={styles.prioryty_Icon_title}>{currentCard.prioryty}</div>
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

              {currentCard.comment.map((comment: CommentCardTypes, index: number) => {
                return <Comment key={index + 1} comment={comment} deleteHandler={deleteComment} author={currentUser}/>
              })}


            </div>

        </div></form>}

    </div>
  )
}

export default OpenCard
