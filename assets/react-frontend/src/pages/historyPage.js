import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const HistoryPage = () => {

  const [data, setData] = useState([
      {
        url: "www.hello.ewwr.com",
        number: "4"
      },
      {
       url: "www.hello.erer.com",
        number: "45"
      },
      {
        url: "www.hello.dfss.com",
        number: "16"
      },
      {
       url: "www.hello.oio.com",
       number: "420"
      },
      {
       url: "www.hello.dfdf.com",
       number: "50"
      },
      {
       url: "www.hello.iopo.com",
       number: "80"
      }
  ])

  return (
    <div>
      {
        !data ? <div></div> : (
          <div className="decorate" align="center" style={{ paddingTop: 50 }}>
            <div className="Card " style={{ width: 750 }}>
            <div
              className="Card box"
              style={{ width: 600, border: "thick solid black" }}
            >
              <br />
              <div className="row">
                <div className="col-md-12 ">
                  <h2 className="card-title" style={{ fontFamily: "Courier New" }}>
                    History
                  </h2>
                </div>
                <br />
              </div>
                <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <table class="table">
                        <thead>
                          <tr>
                            <th scope="col" style={{ fontFamily: "Courier New" }}>url</th>
                            <th scope="col" style={{ fontFamily: "Courier New" }}>view</th>
                          </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                          <tr>
                            <td style={{ fontFamily: "Courier New" }}>{item.url}</td>
                            <td style={{ fontFamily: "Courier New" }}>{item.number}</td>
                          </tr>
                          ))}
                      </tbody>
                    </table>
                    </div>    
                </div>
                <div className="col-md-1"></div>
              <br />
            </div>
          </div>
          </div>
        )
      }
    </div>
  )
    
}
export default HistoryPage;