export class MockData {
    YYYYMMDD: string; // datum (YYYY=jaar, MM=maand, DD=dag)
    HH: string; // tijd (HH=uur
    DD: string; //settings Windrichting (in graden) gemiddeld over de laatste 10 minuten van het afgelopen uur (360=noord
    FH: string; //settings Uurgemiddelde windsnelheid (in 0.1 m/s). Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken / Hourly mean wind speed (in 0.1 m/s)
    FF: string; //settings Windsnelheid (in 0.1 m/s) gemiddeld over de laatste 10 minuten van het afgelopen uur / Mean wind speed (in 0.1 m/s) during the 10-minute period preceding the time of observation 
    FX: string; //settings Hoogste windstoot (in 0.1 m/s) over het afgelopen uurvak / Maximum wind gust (in 0.1 m/s) during the hourly division
    T: string; //settings Temperatuur (in 0.1 graden Celsius) op 1.50 m hoogte tijdens de waarneming / Temperature (in 0.1 degrees Celsius) at 1.50 m at the time of observation
    T10N: string; // Minimumtemperatuur (in 0.1 graden Celsius) op 10 cm hoogte in de afgelopen 6 uur / Minimum temperature (in 0.1 degrees Celsius) at 0.1 m in the preceding 6-hour period
    TD: string; //settings Dauwpuntstemperatuur (in 0.1 graden Celsius) op 1.50 m hoogte tijdens de waarneming / Dew point temperature (in 0.1 degrees Celsius) at 1.50 m at the time of observation
    SQ: string; //settings Duur van de zonneschijn (in 0.1 uren) per uurvak
    Q: string; //settings Globale straling (in J/cm2) per uurvak / Global radiation (in J/cm2) during the hourly division
    DR: string; //settings Duur van de neerslag (in 0.1 uur) per uurvak / Precipitation duration (in 0.1 hour) during the hourly division
    RH: string; //settings Uursom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm) / Hourly precipitation amount (in 0.1 mm) (-1 for <0.05 mm)
    P: string; //settings Luchtdruk (in 0.1 hPa) herleid naar zeeniveau
    VV: string; //settings Horizontaal zicht tijdens de waarneming (0=minder dan 100m
    N: string; //settings Bewolking (bedekkingsgraad van de bovenlucht in achtsten)
    U: string; //settings Relatieve vochtigheid (in procenten) op 1.50 m hoogte tijdens de waarneming / Relative atmospheric humidity (in percents) at 1.50 m at the time of observation
    WW: string; //settings Weercode (00-99)
    IX: string; //settings Weercode indicator voor de wijze van waarnemen op een bemand of automatisch station (1=bemand gebruikmakend van code uit visuele waarnemingen
    M: string; //settings Mist 0=niet voorgekomen
    R: string; //settings Regen 0=niet voorgekomen
    S: string; //settings Sneeuw 0=niet voorgekomen
    O: string; //settings Onweer 0=niet voorgekomen
    Y: string; //settings IJsvorming 0=niet voorgekomen
    constructor(data: any) {
        this.YYYYMMDD = data.YYYYMMDD;
        this.HH = data.HH;
        this.DD = data.DD;
        this.FH = data.FH;
        this.FF = data.FF;
        this.FX = data.FX;
        this.T = data.T;
        this.T10N = data.T10N;
        this.TD = data.TD;
        this.SQ = data.SQ;
        this.Q = data.Q;
        this.DR = data.DR;
        this.RH = data.RH;
        this.P = data.P;
        this.VV = data.W;
        this.N = data.N;
        this.U = data.U;
        this.WW = data.WW;
        this.IX = data.IX;
        this.M = data.M;
        this.R = data.R;
        this.S = data.S;
        this.O = data.O;
        this.Y = data.Y;
    }
}