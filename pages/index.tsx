import useSWR from "swr";
import TabView from "../components/TabView";
import { InitialLeague, Match, Welcome } from "../types/LeagueType";
import { useMemo, useCallback } from "react";
const Home:React.FC<{ league?: { [key: string]: Welcome } }>=({league})=>{
  //const { data: league } = useSWR("league", async () => await fetcher());
  const TabContent: React.FC<{ league?: InitialLeague }> = ({ league }) => {
    const result = useMemo(() => {
      let ret: { [team: string]: { win: number; lose: number } } = {};
      league?.matches.forEach((match) => {
        Object.keys(match.teams).forEach((team) => {
          if (!ret[team]) {
            ret[team] = {
              win: 0,
              lose: 0,
            };
          }
          if (!match.finished) return;
          if (match.winner === team) {
            ret[team].win = ret[team].win + 1;
          } else {
            ret[team].lose = ret[team].lose + 1;
          }
        });
      });
      return ret;
    }, [league]);

    if (!league) return <></>;
    return (
      <>
        {league.teams
          .sort((a, b) => {
            return result[b.id].win -
              result[b.id].lose -
              (result[a.id].win - result[a.id].lose) >
              0
              ? 1
              : -1;
          })
          .map((team, idx) => (
            <div
              style={{
                border: "1.5px solid gold",
                borderRadius: 10,
                margin: 8,
                padding: 8,
                backgroundColor: "black",
                color: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    height: 20,
                    width: 60,
                    background: `linear-gradient(to right, #aa9d52, gold 80%)`,
                    clipPath:
                      "polygon(0% 100%, 0% 0%, 100% 0%,85% 50%, 100% 100%)",
                    color: "white",
                    padding: "2px 4px",
                    backgroundSize: "cover",
                    border: "1px solid yellow",
                  }}
                >
                  {idx + 1}
                </div>
                <div
                  style={{
                    backgroundColor: "#333",
                    borderRadius: 10,
                    border: "1px solid #555",
                    width: "100%",
                    padding: 4,
                  }}
                >
                  {team.name}
                </div>
              </div>
              <div
                style={{
                  textAlign: "right",
                  fontFamily: "Racing Sans One",
                }}
              >
                <span
                  style={{
                    color: "gold",
                  }}
                >
                  {result[team.id].win}
                </span>
                &nbsp;WIN &nbsp;
                <span
                  style={{
                    color: "gold",
                  }}
                >
                  {result[team.id].lose}
                </span>
                &nbsp;LOSE
              </div>
            </div>
          ))}
      </>
    );
  };

  const GameContent: React.FC<{ league?: InitialLeague }> = ({ league }) => {
    const filteredMatches = useCallback((match: Match) => {
      return Object.keys(match.teams).filter((Mteam) => {
        return match.teams[Mteam].score !== null;
      });
    }, []);
    return (
      <>
        {league?.matches.map((match) => (
          <>
            {filteredMatches(match).length > 0 ? (
              <div
                style={{
                  border: "1.5px solid gold",
                  borderRadius: 10,
                  margin: 8,
                  padding: 8,
                  backgroundColor: "black",
                  color: "white",
                  display: "flex",
                }}
              >
                {(() => {
                  let array: any = [];
                  filteredMatches(match).forEach((Mteam, idx) => {
                    array.push(
                      <div
                        style={{
                          width: "32vw",
                          textAlign: "center",
                        }}
                      >
                        {
                          league.teams.find((Lteam) => {
                            return Lteam.id === Mteam;
                          })?.name
                        }
                      </div>
                    );
                    if (idx === 0) {
                      array.push(
                        <div
                          style={{
                            width: "32vw",
                            textAlign: "center",
                          }}
                        >
                          {Object.values(match.teams)
                            .map((team) => team.score)
                            .join(" - ")}
                        </div>
                      );
                    }
                  });
                  return array;
                })()}
              </div>
            ) : (
              <></>
            )}
          </>
        ))}
      </>
    );
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)",
        height: "100vh",
      }}
    >
      <div
        style={{
          fontSize: 30,
          color: "white",
          textAlign: "center",
          padding: 8,
        }}
      >
        蓋野球
        <span
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          魂
        </span>
        杯
      </div>
      <TabView
        tabs={[
          {
            title: "リーグA",
            component: (
              <TabView
                tabWidth={80}
                tabs={[
                  {
                    title: "順位",
                    component: (
                      <TabContent
                        league={league?.dataA.pageProps.initialLeague}
                      />
                    ),
                  },
                  {
                    title: "試合結果",
                    component: (
                      <GameContent
                        league={league?.dataA.pageProps.initialLeague}
                      />
                    ),
                  },
                ]}
              />
            ),
          },
          {
            title: "リーグB",
            component: (
              <TabView
                tabWidth={80}
                tabs={[
                  {
                    title: "順位",
                    component: (
                      <TabContent
                        league={league?.dataB.pageProps.initialLeague}
                      />
                    ),
                  },
                  {
                    title: "試合結果",
                    component: (
                      <GameContent
                        league={league?.dataB.pageProps.initialLeague}
                      />
                    ),
                  },
                ]}
              />
            ),
          },
          {
            title: "リーグC",
            component: (
              <TabView
                tabWidth={80}
                tabs={[
                  {
                    title: "順位",
                    component: (
                      <TabContent
                        league={league?.dataC.pageProps.initialLeague}
                      />
                    ),
                  },
                  {
                    title: "試合結果",
                    component: (
                      <GameContent
                        league={league?.dataC.pageProps.initialLeague}
                      />
                    ),
                  },
                ]}
              />
            ),
          },
        ]}
        tabWidth={"32vw"}
      />
    </div>
  );
}

export const fetcher = async () => {
  const responseA = await fetch(
    "https://the-tournament.net/_next/data/9n8vnpYlyQ87sb9Rdtr8M/ja/leagues/7jX0nl1ebAJA4hEqQGoc.json?id=7jX0nl1ebAJA4hEqQGoc"
  );
  const dataA = await responseA.json();
  const responseB = await fetch(
    "https://the-tournament.net/_next/data/9n8vnpYlyQ87sb9Rdtr8M/ja/leagues/vRCpUcyskgKDtKbr4CHT.json?id=vRCpUcyskgKDtKbr4CHT"
  );
  const dataB = await responseB.json();
  const responseC = await fetch(
    "https://the-tournament.net/_next/data/9n8vnpYlyQ87sb9Rdtr8M/ja/leagues/gjzpb571WZX6Kng2pSz3.json?id=gjzpb571WZX6Kng2pSz3"
  );
  const dataC = await responseC.json();
  const data: { [key: string]: Welcome } = { dataA, dataB, dataC }
  return data;
};

export const getStaticProps=async()=>{
  const league = await fetcher()
  return{
    props: {
      league
    }
  }
}

export default Home