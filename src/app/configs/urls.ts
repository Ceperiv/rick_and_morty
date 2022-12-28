import {environment} from "../../environments/environment";

const {API} = environment

const characters = `${API}/character`
const locations = `${API}/location`
const episodes = `${API}/episode`

export const urls = {
  characters,
  locations,
  episodes,
}

