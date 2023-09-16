const SocketEventsSystem = {
	// estandar
	disconnect: "disconnect",

	// personalizados
};

export const ForeignExchangeEvent = {
	update: "/dolar/update",
};

export const StopwatchEvents = {
	sendUpdate: "/stopwatch/send_update",
	create: "/stopwatch/create",
	delete: "/stopwatch/delete",
};


export const BillEvents = {
	send: "/bill/send",
};

export default SocketEventsSystem;
