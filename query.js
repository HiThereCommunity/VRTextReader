// @flow

const query = `
{
  events(slug: "reacteurope-2017") {
    speakers {
      id
      name
      twitter
      github
      bio
      avatarUrl
      talks {
        startDate
        id
        title
        description
      }
    }
  }
}`;

export type APIResult = Array<{
  avatarUrl: string,
  bio: string,
  name: string,
  talks: Array<{
    description: string,
    startDate: string,
    title: string
  }>
}>

export default (): Promise<APIResult> => {
  return fetch("https://www.react-europe.org/gql", {
    method: "POST",
    body: JSON.stringify({
      query
    })
  }).then((response) => response.json())
  .then(data => {
    return data.data.events[0].speakers;
  }).then(data => {
    return data;
  })

}
