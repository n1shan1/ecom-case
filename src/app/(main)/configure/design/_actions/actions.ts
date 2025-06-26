"use server";
import { db } from "@/db";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";

export type SaveConfigArgsType = {
  color: CaseColor;
  finish: CaseFinish;
  model: PhoneModel;
  material: CaseMaterial;
  configId: string;
};

export async function saveConfig({
  color,
  finish,
  model,
  material,
  configId,
}: SaveConfigArgsType) {
  await db.configuration.update({
    where: { id: configId },
    data: {
      caseColor: color,
      caseFinish: finish,
      model: model,
      caseMaterial: material,
    },
  });
}
