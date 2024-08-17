import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import team from "../../../../mock/team.json"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method == "POST"){
      try {
        const { name } = req.body

        res.status(200).json(team);
      
      } catch (error) {
        
      }
    }

    return res.status(500).json({message: "Action not allowed"})
}