import React from 'react'
import { Link } from 'react-router-dom'
import style from './styles.module.scss'
const NotFont = () => {
  return (
    <div className={style.container} >
        <div className={style.content}>
            <h2>404</h2>
            <h4>
                Opps! error with data and page not fond.
            </h4>
            <p>
                This page is not exist or have error with data.
            </p>
            <Link to='/'>Back to home.</Link>

        </div>

    </div>
  )
}

export default NotFont