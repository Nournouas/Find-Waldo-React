

export default function FoundGraphic({ foundCharacters, gameDetails}) {
  let foundgraphic = foundCharacters.map((character) => {
      const style = {
        position: "absolute",
        top: character.foundY - ((gameDetails.imageY / 15) / 2),
        left: character.foundX - ((gameDetails.imageX / 30) / 2),
        zIndex: 1,
        width: gameDetails.imageX / 30,
        height: gameDetails.imageY / 15,
        background: `
          linear-gradient(45deg, transparent calc(50% - 2px), red calc(50% - 2px), red calc(50% + 2px), transparent calc(50% + 2px)),
          linear-gradient(-45deg, transparent calc(50% - 2px), red calc(50% - 2px), red calc(50% + 2px), transparent calc(50% + 2px))
        `,
        pointerEvents: "none",
      };
      return <div key={character.name} style={style} ></div>;
  })
  return foundgraphic;
}
