import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";

export default function Hooks() {
	const [number, setNumber] = useState(0);

	const expensiveFunction = parameter => {
		// Fazla kaynak tüketen bir kod bloğu
		console.log("Expensive Function çağırıldı..");
		for (let i = 0; i < 10; i++) {
			parameter += i;
		}
		return parameter * 100;
	};

	// useMemo
	const calculation = useMemo(() => expensiveFunction(number), []);
	// useCallback
	const callbackFunction = useCallback(() => {
		console.log("x");
	}, []);

	const count = useRef(0);
	const inputElement = useRef();
	useEffect(() => {
		count.current = count.current + 1;
	});
	const focusInput = () => {
		inputElement.current.focus();
	};
	// useRef
	// renderlar arası veri tutma

	return (
		<div>
			Hooks
			<input
				type="number"
				value={number}
				onChange={event => {
					setNumber(event.target.value);
				}}
			/>
			<p>İlgili component toplam {count.current} kadar render edildi.</p>
			<input type="text" ref={inputElement} />
			<button
				onClick={() => {
					focusInput();
				}}
			>
				İnputa odaklan
			</button>
		</div>
	);
}
