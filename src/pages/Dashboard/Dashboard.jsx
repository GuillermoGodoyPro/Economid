import React from 'react'
import styles from './Dashboard.module.css' 
import Box from '@mui/material/Box'

const Dashboard = () => {
  return (
    <div className={styles.container}>

      <div className={styles.balance}>
        <Box sx={{ bgcolor: '#29212918', height: '14rem', width: '49.8%' }} >
        </Box>

        <Box sx={{ bgcolor: '#29212918', height: '14rem', width: '49.8%' }} >
        </Box>
        
      </div>

      <div className={styles.carrousel}>
        <div className={styles.elemento}></div>
        <div className={styles.elemento}></div>
        <div className={styles.elemento}></div>
        <div className={styles.elemento}></div>
        <div className={styles.elemento}></div>
        <div className={styles.elemento}></div>       
        
      </div>

      <div className={styles.transferencias}>
        <div className={styles.transferencias}>tr1</div>
        <div className={styles.transferencias}>tr2</div>
        <div className={styles.transferencias}>tr3</div>
        <div className={styles.transferencias}>tr4</div>                        
        
      </div>

      <div className={styles.tarjetas}>
          
          <div>
            <div className={styles.elemento}></div>
            <div className={styles.elemento}></div>            
          </div>
          <div>
            <div className={styles.elemento}></div>
            <div className={styles.elemento}></div>            
          </div>
          <div>
            <div className={styles.elemento}></div>
            <div className={styles.elemento}></div>            
          </div>
          <div>
            <div className={styles.elemento}></div>
            <div className={styles.elemento}></div>            
          </div>
       

         
        
        </div>
      </div>
  )
}

export default Dashboard