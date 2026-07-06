import { AuthDTO } from "@/types";
import { DemoDataService } from "./demo-data.service";


export namespace AuthService {
    export async function Login(dto: AuthDTO.LoginRequest) {
        return DemoDataService.login(dto);
    }
}
