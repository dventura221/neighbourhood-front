const NewsCard = (props) => {
  return (
    <div className="CardContainer">
      <div className="CardGrid">
        <img src={props.image} alt={props.title} width="400px" />
        <p>{props.description}</p>
        <div>
          <a href={props.url}>
            <h3>{props.title}</h3>
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
