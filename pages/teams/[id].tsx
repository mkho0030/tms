import { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'

const Teams: NextPage = () => {
  // Use to get id from url.
  // Eg: localhost:3000/teams/901kdk90kedkjfi23jf

  // Using `router.query.id` gives you 901kdk90kedkjfi23jf
  const router = useRouter()

  // Todo: Create toolbar for teams pages
  // Try to create the toolbar in the `components` folder and then use it in this page.
  // Good practise to split code to avoid dependency and hard to read code.
  return (
    <div>Teams</div>
  )
}

export default Teams