import React from "react"
import Layout from "../components/Layout"
import AvailableTimes from "react-available-times"

//https://github.com/trotzig/react-available-times

const IndexPage = () => (
  <Layout>
    <AvailableTimes
      weekStartsOn="monday"
      calendars={[
        {
          id: "work",
          title: "Work",
          foregroundColor: "#ff00ff",
          backgroundColor: "#f0f0f0",
          selected: true,
        },
        {
          id: "private",
          title: "My private cal",
          foregroundColor: "#666",
          backgroundColor: "#f3f3f3",
        },
      ]}
      onChange={selections => {
        selections.forEach(({ start, end }) => {
          console.log("Start:", start, "End:", end)
        })
      }}
      height={800}
      recurring={false}
    />
  </Layout>
)

export default IndexPage
