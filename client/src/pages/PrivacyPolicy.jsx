import React from "react";
// import PageBox from "../components/styles/PageBox";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const PrivacyPolicy = () => {
  return (
    <PageBox>
      <Typography gutterBottom variant="h2">
        Privatumo politika
      </Typography>
      <Typography gutterBottom variant="h5">
        Ši privatumo politika (toliau - „politika“) reglamentuoja asmens duomenų
        rinkimą, naudojimą, saugojimą ir apsaugą, kai jūs (toliau -
        „vartotojas“) naudojatės http://localhost:5173/ interneto svetaine
        (toliau - „svetainė“) ir jos teikiamomis paslaugomis.
      </Typography>
      <Typography variant="h6">
        1. Asmens duomenų rinkimas ir tvarkymas
      </Typography>
      <Typography variant="subtitle1">
        1.1. Kuomet naršote mūsų svetainėje, automatiškai renkame tam tikrą
        informaciją apie jūsų įrenginį - jūsų IP adresą, naršyklės tipą ir
        versiją, puslapių, kuriuose lankėtės laiką ir datą, bei kitą statistinę
        informaciją.
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        1.2. Taip pat, galime rinkti asmeninius duomenis, kuriuos jūs savo
        pasirinkimu pateikiate mūsų svetainėje esančiuose formularuose, siekant
        atsakyti į jūsų užklausas ar suteikiant tam tikrą paslaugą.
      </Typography>
      <Typography variant="h6">
        2. Asmens duomenų saugojimas ir apsauga
      </Typography>
      <Typography variant="subtitle1">
        2.1. Mes įsipareigojame užtikrinti asmens duomenų konfidencialumą ir jų
        saugumą, taikydami tinkamas technines ir organizacines priemones, kad
        būtų apsaugoti nuo neteisėto ar netinkamo naudojimo, praradimo,
        sunaikinimo ar pažeidimo.
      </Typography>
      <Typography variant="subtitle1">
        2.2. Mes saugosime jūsų asmens duomenis tiek, kiek tai būtina siekiant
        vykdyti mūsų teisinius įsipareigojimus arba vykdyti mūsų verslo
        interesus.
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        2.3. Galite apsilankyti mūsų svetainėje, nesuteikdami jokios
        informacijos, kuria būtų galima identifikuoti jūsų asmens tapatybę.
        Tačiau, jeigu norėsite pasinaudoti mūsų svetainės funkcijomis, norėsite
        gauti mūsų naujienlaiškį arba užpildysite mūsų kontaktinę formą, tuomet
        taip galite suteikti mums savo asmeninių duomenų: el. pašto adresą,
        vardą, pavardę, gyvenamosios vietos informaciją, telefono numerį. Turite
        pasirinkimą nesuteikti mums savo asmeninių duomenų, tačiau tokiu atveju
        negalėsite naudotis dauguma svetainės teikiamų funkcijų. Svetainės
        lankytojai, nežinantys, kokią informaciją privalome rinkti, gali
        susisiekti su mumis el. paštu: bavis.sistema.lt@gmail.com.{" "}
      </Typography>
      <Typography variant="h6">3. Duomenų gavimas iš trečiųjų šalių</Typography>
      <Typography gutterBottom variant="subtitle1">
        3.1. Jūsų asmens duomenis perduodame tik patikimoms trečiosioms šalims
        ir tik siekdami tinkamai įgyvendinti asmens duomenų tvarkymo tikslus.
        Taip pat, galime perduoti jūsų asmens duomenis, kai to reikalauja
        galiojantys teisiniai įstatymai arba kai tai būtina mūsų paslaugų
        teikimui.
      </Typography>
      <Typography variant="h6">4. Trečiųjų šalių svetainės</Typography>
      <Typography gutterBottom variant="subtitle1">
        4.1. Šioje svetainėje gali būti trečiųjų šalių reklaminių skydelių,
        nuorodų į jų svetaines ir paslaugas, kurių mes nekontroliuojame ir
        neatsakome už informacijos, kurią surinko trečiosios šalys, saugą ir
        privatumą. Rekomenduojame perskaityti privatumo nuostatas, taikomas
        trečiųjų šalių svetainėms ir paslaugoms, kuriomis naudojatės. Ši
        privatumo politika buvo sukurta naudojantis Nordweb privatumo politikos
        kūrimo įrankiu - https://nordweb.lt.
      </Typography>
      <Typography variant="h6">5. Slapukai ir sekimo technologijos</Typography>
      <Typography variant="subtitle1">
        5.1. Mūsų svetainė gali naudoti slapukus ir kitas sekimo technologijas,
        kad pagerintų jūsų naudojimosi patirtį ir analizuotų srautą. Jūs galite
        bet kada pasirinkti, ar sutinkate su slapukų naudojimu savo naršyklės
        nustatymuose.
      </Typography>
      <Typography gutterBottom variant="subtitle1">
        5.2. Mes nesusiejame lankytojo IP adreso ir elektroninio pašto adreso ar
        kitos asmeninės informacijos su duomenimis, kurie leidžia identifikuoti
        lankytoją. Tai reiškia, kad kiekvieno lankytojo apsilankymo sesija bus
        užregistruota, tačiau svetainės lankytojas išliks anonimiškas.
      </Typography>
      <Typography variant="h6">6. Jūsų teisės</Typography>
      <Typography gutterBottom variant="subtitle1">
        6.1. Jūs turite teisę susipažinti su asmens duomenimis, kurie yra apie
        jus renkami ir tvarkomi, taip pat prašyti šių duomenų pataisymo,
        ištrinimo arba perkėlimo į kitą organizaciją. Taip pat jūs turite teisę
        prieštarauti duomenų tvarkymui.
      </Typography>
      <Typography variant="h6">7. Kontaktai</Typography>
      <Typography gutterBottom variant="subtitle1">
        7.1. Jeigu turite klausimų ar pageidaujate gauti daugiau informacijos
        apie mūsų privatumo politiką, prašome susisiekti su mumis el. paštu:
        bavis.sistema.lt@gmail.com.
      </Typography>
    </PageBox>
  );
};

const PageBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: 20,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default PrivacyPolicy;
