import { MouseEventHandler } from "react";

export interface ButtonProps {
    title: string,
    func?: MouseEventHandler<HTMLButtonElement> | undefined,
    children?: never[]
}

export interface IUser{
    User: string,
    Password: string
}

export interface IPConfig{
    hostname: string,
    port: number,
    mode: string
}