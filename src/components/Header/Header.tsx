'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Cookie from 'js-cookie'


// css

import styles from '@/components/Header/Header.module.css'

//

import { Container, Row, Col } from 'react-bootstrap'

// img

import logo from '@/asset/header/logo.svg'
import leftArrow from '@/asset/header/arrowLeft.svg'
import rightArrow from '@/asset/header/arrowRight.svg'

// components

import MyButton from '@/components/UI/Button/MyButton'

// fn

import { signOut } from '@/functions/logout'




const Header: FC = () => {



  return (
    <Container className='mb-5 mt-5' fluid>

      <Row>

        <Col md={4} className='d-flex justify-content-center align-items-center'><Image src={logo} width={120} alt='logo'/></Col>

        <Col md={4} className='d-flex justify-content-center align-items-center'><div className={styles.header_title}>Менеджер задач</div></Col>

        <Col md={4} className='d-flex justify-content-center align-items-center'>

            <Image className={styles.header_icon} src={leftArrow} width={42} alt='left-arrow'/>
            <Image className={styles.header_icon} src={rightArrow} width={42} alt='left-arrow'/>
            <MyButton text={'Выйти'} type={'button'} name={'btn'} onClick={() => {signOut()}}/>

        </Col>

      </Row>

    </Container>

  )
}

export default Header