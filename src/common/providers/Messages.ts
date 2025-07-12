export enum ModuleItems {
  user = 'usuario',
  profile = 'perfil de usuario',
  bill = 'factura',
  billItem = 'item de factura',
  product = 'producto',
  productReference = 'referencia entre productos',
  stopwatch = 'cronometro',
  foreignExchange = 'divisas',
}

export class Messages {
  static success = {
    created: (item: ModuleItems) => `El/La ${item} fue creado correctamente`,
    updated: (item: ModuleItems) =>
      `El/La ${item} fue actualizado correctamente`,
    deleted: (item: ModuleItems) => `El/La ${item} fue eliminado correctamente`,
    passwordsChanged: () => 'la contraseña fue actualizado correctamente',
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

    internal: () => 'Error en el servidor',
    duplicate: () => 'Ya existe un registro con esos datos',

    passwordsNotMatch: () => 'las contraseñas no coinciden',
    invalidCredentials: () => 'usuario/Contraseña incorrecta',
    withoutPermission: () => 'not have required permission',
    notToken: () => 'token no encontrado',
    defeatedToken: () => 'token vencido',

    whenObtaining: (item: ModuleItems) => `error al intentar obtener ${item}`,
    whenObtainingProfile: () => 'whenObtainingProfile',

    onDeleteForeignExchange: () =>
      'no se puede eliminar debido a que el registro de divisas no fue creado por un usuario',

    onCircularProductReference: () =>
      `no se puede crear la referencia por que hay dependecia circular o ya existe`,

    onDeleteProductHasChilds: (names: string[]) =>
      `no se puede eliminar debido a referencias existentes con (${names.join(', ')})`,
  };
}
