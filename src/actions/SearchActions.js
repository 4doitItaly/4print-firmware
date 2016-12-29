import { readGcodeAndImage } from '../api/readFiles'

export function searchFile(term, dispatch) {
   readGcodeAndImage(results => {
      let searchResult = results.filter(result => {
         return result.name.toLowerCase().indexOf(term.toLowerCase()) !== -1

      })
      console.log(searchResult);
      dispatch({
         type: 'SEARCH',
         results: searchResult
      })
   })

}
