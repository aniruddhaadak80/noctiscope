/// Deterministic brainwave mixer (mirrors packages/core brainwaves.ts).
/// powers must sum near 100; we normalize defensively.
pub fn mix_waves(powers: [u32; 5]) -> [u32; 5] {
    let total: u32 = powers.iter().sum();
    if total == 0 {
        return [20, 20, 20, 20, 20];
    }
    let mut out = [0u32; 5];
    let mut acc = 0u32;
    for (i, p) in powers.iter().enumerate() {
        if i == 4 {
            out[i] = 100 - acc;
        } else {
            out[i] = (u64::from(*p) * 100 / u64::from(total)) as u32;
            acc += out[i];
        }
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn mixes_to_100() {
        assert_eq!(mix_waves([2, 5, 15, 60, 18]).iter().sum::<u32>(), 100);
    }
    #[test]
    fn zero_is_safe() {
        assert_eq!(mix_waves([0, 0, 0, 0, 0]).iter().sum::<u32>(), 100);
    }
}
