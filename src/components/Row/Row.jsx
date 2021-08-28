import Cell from "../Cell/Cell"

function Row({cellsArray, onClick}) {
	
	return(
		<div className="row">
			{cellsArray.map((cell, i) => <Cell key={i} cellObj={cell} onClick={(y, x) => {onClick(y, x)}}></Cell>)}
		</div>
	)
}

export default Row;