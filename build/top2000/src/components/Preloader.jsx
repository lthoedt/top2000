import { Preloader } from 'framework7-react';

export default function PreloaderModal(props) {
	return (
		<div>
			<div className={`dialog-backdrop backdrop-${(props.show === true) ? "in" : "out"}`}></div>
			<div className={`dialog dialog-no-buttons dialog-preloader modal-${(props.show === true) ? "in" : "out"}`} style={{ display: "block" }}>
				<div className="dialog-inner">
					{(props.title &&
						<div className="dialog-title">
							{props.title}
						</div>
					)}
					<Preloader ></Preloader>
				</div>
			</div>
		</div>
	)
}