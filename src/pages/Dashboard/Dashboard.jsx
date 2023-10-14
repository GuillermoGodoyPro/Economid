import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import useAuth from '../../hooks/useAuth';
import jwt_decode from "jwt-decode";
import { GetBalanceByPEId } from '../../services/balance.service';

const Dashboard = () => {

  const { auth } = useAuth()
  const [data, setData] = useState(null);
  const [cargando, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usuario = jwt_decode(auth);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GetBalanceByPEId(usuario.P_E_Id, config);
        setData(res);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log(data);
  return (
    cargando
      ?
      <h3>Loading...</h3>
      :
      <div className={styles.container}>
        <div className={styles.balance}>
          <div className={styles.elemento}>
            <h3>
            {data.data.saldo_Inicial}
          </h3>
          <h3>
          {data.data.saldo_Total}
          </h3>
          </div>
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