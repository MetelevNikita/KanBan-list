import { FC } from "react"

// css

import styles from '@/components/OpenCard/OpenCard.module.css'

// types

import{ CardType } from "@/types/type"


interface OpenCardProps {
  card: CardType
}

const OpenCard: FC<OpenCardProps> = ({ card }) => {


  console.log(card)

  return (
    <div className={styles.openCard_container}>

      <div className={styles.openCard_box}>


        <div>{card.title}</div>



        <div>

            <div>id: {card.id}</div>
            <div>Дата создания: {card.dateCreated}</div>

        </div>


        <div>Статус заявки: {card.status}</div>
        <div>Описание заявки: {card.description}</div>


        <div>

            <div>{card.prioryty}</div>
            <div>{card.deadline}</div>

        </div>




      </div>

    </div>
  )
}

export default OpenCard
