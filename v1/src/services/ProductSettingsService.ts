import ProductSettingsModel from "../models/ProductSettings.model";
import { ProductSettings, ProductSettingsFromDB } from "../types";

// ****************************************************************************
// 										              obtener
// ****************************************************************************

export const getProductSettings_service =
	async (): Promise<ProductSettingsFromDB> => {
		try {
			const productSettings = await ProductSettingsModel.findOne();

			if (productSettings) return productSettings;

			const newProductSettings = new ProductSettingsModel();

			await newProductSettings.save();

			return newProductSettings;
		} catch (error) {
			console.log(error);
			throw new Error("Error al conseguir dato");
		}
	};

// ****************************************************************************
// 										              actualizar
// ****************************************************************************

export const updateProductSettings_service = async (
	data: ProductSettings
): Promise<ProductSettingsFromDB | undefined> => {
	try {
		await ProductSettingsModel.updateMany({}, data);

		const productSettings = await getProductSettings_service();

		return productSettings;
	} catch (error) {
		return;
	}
};
