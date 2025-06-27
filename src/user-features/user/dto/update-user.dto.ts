import { CreateUserDto } from "./create-user.dto";

export interface UpdateUserDto
	extends Partial<Omit<CreateUserDto, "_id" | "createdAt" | "updatedAt">> {}
