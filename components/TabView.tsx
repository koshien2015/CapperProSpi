import { useState } from "react";

export type tab = {
    title:string,
    component:any
}
export type tabs={
    tabs: tab[],
    tabWidth:number | string
}

const TabView:React.FC<tabs> = ({tabs, tabWidth}) => {
  const [screenNumber, setScreenNumber] = useState<number>(0);
  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display:'flex',
            overflowX:'scroll'
            //flexWrap:'wrap'
          }}
          className='no-scroll-bar'
        >
          {tabs.map((tab, idx) => (
            <div
              style={{
                minWidth: tabWidth,
                overflow:'hidden',
                color: screenNumber === idx ? "white" : "",
                textAlign:'center',
                fontSize:12,
                padding:4,
                backgroundColor: screenNumber === idx ? "#000000" : "white",
                border: '1px solid #999999',
                cursor:'pointer'
              }}
              onClick={() => {
                console.log(idx);
                setScreenNumber(idx);
              }}
            >
              {tab.title}
            </div>
          ))}
        </div>
      </div>
      <div>
        {tabs.map((tab, idx)=>(
            <div
                style={{
                    display: screenNumber === idx ? '':'none'
                }}
            >
                {tab.component}
            </div>
        ))}
      </div>
    </div>
  );
};
export default TabView;
