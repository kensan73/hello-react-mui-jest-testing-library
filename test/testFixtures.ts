import { ExperienceInfo } from "../src/MyForm";

export const reservationExperience: ExperienceInfo = {
    name: 'reservation experience',
    id: "23"
}

export const patioExperience: ExperienceInfo = {
    name: 'patio experience',
    id: "49"
}

export const barExperience: ExperienceInfo = {
    name: 'bar experience',
    id: "57"
}

export const tableD1 = { id: '12', name: 'D1', experiences: [reservationExperience], room: 'dining' };
export const tableD2 = { id: '14', name: 'D2', experiences: [reservationExperience], room: 'dining' };
export const tableB1 = { id: '54', name: 'B1', experiences: [barExperience, reservationExperience], room: 'bar' };
export const tableB2 = { id: '55', name: 'B2', experiences: [barExperience, reservationExperience], room: 'bar' };
export const tableP1 = { id: '60', name: 'P1', experiences: [patioExperience], room: 'patio' };