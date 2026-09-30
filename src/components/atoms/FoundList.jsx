export default function FoundList({ foundCharacters }) {
  let foundList = foundCharacters.map((character) => {
    return <li key={character.name}>{character.name}</li>;
  })
  return foundList;
}
