export enum ModuleItems {
	user = "usuario",
	profile = "perfil de usuario",
	bill = "factura",
	billItem = "item de factura",
	product = "producto",
	stopwatch = "cronometro",
}

export default class Messages {
	static success = {
		created: (item: ModuleItems) => `El/La ${item} fue creado correctamente`,
		updated: (item: ModuleItems) =>
			`El/La ${item} fue actualizado correctamente`,
		deleted: (item: ModuleItems) => `El/La ${item} fue eliminado correctamente`,
	};

	static error = {
		errorInData: (item: ModuleItems) =>
			`Hay algun error en los datos del ${item}`,
		alreadyExist: (item: ModuleItems) => `El/La ${item} ya existe`,
		notFound: (item: ModuleItems) => `El/La ${item} no fue encontrado`,
		notCreated: (item: ModuleItems) => `El/La ${item} no fue creado`,
		notUpdated: (item: ModuleItems) => `El/La ${item} no fue actualizado`,
		notDeleted: (item: ModuleItems) => `El/La ${item} no fue eliminado`,
		hasDependencies: (item: ModuleItems) => `El/La ${item} tiene dependencias`,

		internal: () => "Error en el servidor",
		duplicate: () => "Ya existe un registro con esos datos",
		invalidCredentials: () => "usuario/Contraseña incorrecta",
		withoutPermission: () => "not have required permission",
		notToken: () => "token no encontrado",
		defeatedToken: () => "token vencido",
		whenObtaining: (item: ModuleItems) => `error al intentar obtener ${item}`,
		whenObtainingProfile: () => "whenObtainingProfile",
	};
}
