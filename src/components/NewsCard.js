const NewsCard = (props) => {
  return (
    <div className="CardContainer">
      <div className="CardGrid">
        <h2>{props.source}</h2>
        <a href={props.url}>
          <img src={props.image} alt={props.title} />
        </a>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default NewsCard
